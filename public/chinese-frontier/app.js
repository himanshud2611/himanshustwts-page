const state = {
  search: "",
  company: "All",
  vertical: "All"
};

const els = {
  count: document.querySelector("#result-count"),
  table: document.querySelector("#catalog-table"),
  search: document.querySelector("#search"),
  company: document.querySelector("#company-filter"),
  vertical: document.querySelector("#vertical-filter"),
  reset: document.querySelector("#reset-filters")
};

const companyLogos = {
  "DeepSeek": "./logos/deepseek.png",
  "Alibaba / Qwen": "./logos/qwen.png",
  "Moonshot AI / Kimi": "./logos/kimi.png",
  "MiniMax": "./logos/minimax.jpg",
  "Zhipu AI / GLM": "./logos/glm.jpg",
  "ByteDance Seed": "./logos/bytedance seed.png",
  "Tencent Hunyuan": "./logos/Tencent Hunyuan.jpg",
  "StepFun": "./logos/stepfun.png",
  "Baidu ERNIE": "./logos/baidu.jpg"
};

let catalogItems = [];

async function init() {
  try {
    const response = await fetch("./catalog.md", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Unable to load catalog.md: ${response.status}`);
    }

    const markdown = await response.text();
    catalogItems = parseCatalog(markdown);
    populateFilters();
    bindEvents();
    render();
  } catch (error) {
    els.table.innerHTML = `
      <tr>
        <td class="empty" colspan="5">
          Could not load <code>catalog.md</code>. Serve this folder locally, for example with
          <code>python3 -m http.server 5173</code>.
        </td>
      </tr>
    `;
    els.count.textContent = error.message;
  }
}

function parseCatalog(markdown) {
  const lines = markdown.split(/\r?\n/);
  const items = [];
  let vertical = "General";
  let company = "Uncategorized";
  let inLabMap = false;
  const hasLabMap = markdown.includes("## Lab-wise Innovation Map");

  for (const line of lines) {
    if (line.match(/^##\s+Lab-wise Innovation Map\s*$/i)) {
      inLabMap = true;
      vertical = "General";
      company = "Uncategorized";
      continue;
    }

    if (hasLabMap && inLabMap && line.match(/^##\s+/) && !line.match(/^##\s+Lab-wise Innovation Map\s*$/i)) {
      break;
    }

    if (hasLabMap && !inLabMap) continue;

    const labHeadingMatch = line.match(/^###\s+(.+)$/);
    if (hasLabMap && labHeadingMatch) {
      company = normalizeCompany(labHeadingMatch[1]);
      continue;
    }

    const verticalMatch = line.match(/^###\s+VERTICAL\s+\d+:\s+(.+)$/i);
    if (verticalMatch) {
      vertical = cleanVertical(verticalMatch[1]);
      company = "Uncategorized";
      continue;
    }

    const companyMatch = line.match(/^\*\*(.+?)\*\*\s*$/);
    if (companyMatch) {
      company = normalizeCompany(companyMatch[1]);
      continue;
    }

    const bulletMatch = line.match(/^-\s+\*\*(.+?)\*\*\s+—\s+(.+)$/);
    if (!bulletMatch) continue;

    const rawTitle = bulletMatch[1].trim();
    const body = bulletMatch[2].trim();
    const firstSentence = splitFirstSentence(body);
    const categorySplit = splitCategory(firstSentence.date, firstSentence.description);
    if (categorySplit.category) {
      vertical = categorySplit.category;
      firstSentence.description = categorySplit.description;
    }
    let date = firstSentence.date || inferDate(body);
    const year = inferYear(`${date} ${body}`);
    const links = extractLinks(body);
    const description = cleanDescription(firstSentence.description || body);
    const inferred = inferCompanyAndTitle(rawTitle, firstSentence.date, company);
    date = cleanDate(date);

    items.push({
      id: `${items.length}-${slugify(inferred.title)}`,
      date,
      year,
      company: normalizeCompany(inferred.company),
      title: inferred.title,
      vertical,
      description,
      links,
      searchText: [inferred.title, inferred.company, vertical, date, description, links.map((link) => link.url).join(" ")]
        .join(" ")
        .toLowerCase()
    });
  }

  return items;
}

function splitCategory(label, description) {
  const categories = [
    "Architecture",
    "Pre-training",
    "Reinforcement Learning",
    "Post-training",
    "Alignment",
    "Safety",
    "Multimodal",
    "Agents",
    "Long-context",
    "Inference",
    "Serving",
    "Embeddings",
    "Retrieval",
    "Code",
    "Domain",
    "Evaluation",
    "Training Systems",
    "Data",
    "General",
    "Source Feed"
  ];

  const normalized = String(label).trim();
  if (categories.includes(normalized)) {
    return { category: normalized, description };
  }

  return { category: null, description };
}

function cleanDate(date) {
  const companyPrefixedDate = String(date).match(/^.+?,\s*((?:early|mid|late)?\s*20\d{2})$/i);
  if (companyPrefixedDate) return companyPrefixedDate[1].trim();
  return date;
}

function inferCompanyAndTitle(title, dateText, currentCompany) {
  const titleCompanyMatch = title.match(/^(.+?)\s+—\s+(.+)$/);
  if (titleCompanyMatch) {
    return {
      company: titleCompanyMatch[1].trim(),
      title: titleCompanyMatch[2].trim()
    };
  }

  const genericCompanySection = /foundational|other notable|uncategorized/i.test(currentCompany);
  const dateCompanyMatch = String(dateText).match(/^(.+?),\s*(?:early|mid|late)?\s*20\d{2}/i);

  if (genericCompanySection && dateCompanyMatch) {
    return {
      company: dateCompanyMatch[1].trim(),
      title
    };
  }

  return {
    company: currentCompany,
    title
  };
}

function cleanVertical(value) {
  return value.replace(/\s*\(.+?\)\s*/g, "").trim();
}

function normalizeCompany(value) {
  return value
    .replace("Alibaba / Qwen", "Alibaba / Qwen")
    .replace("Moonshot AI", "Moonshot AI")
    .trim();
}

function splitFirstSentence(body) {
  const match = body.match(/^(.+?)\.\s+(.*)$/);
  if (!match) {
    return { date: inferDate(body), description: body };
  }

  return {
    date: match[1].trim(),
    description: match[2].trim()
  };
}

function inferDate(text) {
  const dateMatch = text.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b/i);
  if (dateMatch) return dateMatch[0];

  const yearRangeMatch = text.match(/\b\d{4}\s*[–-]\s*\d{4}\b/);
  if (yearRangeMatch) return yearRangeMatch[0];

  const yearMatch = text.match(/\b(?:late|mid|early)?\s*\d{4}\b/i);
  return yearMatch ? yearMatch[0].trim() : "Undated";
}

function inferYear(text) {
  const years = [...text.matchAll(/\b(20\d{2})\b/g)].map((match) => Number(match[1]));
  return years.length ? Math.max(...years) : "Undated";
}

function makeSortKey(date, year) {
  if (year === "Undated") return 0;

  const monthScore = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12
  };

  const monthMatch = String(date).match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i);
  let month = monthMatch ? monthScore[monthMatch[1].toLowerCase().slice(0, 3)] : 6;

  if (/\bearly\b/i.test(String(date))) month = 2;
  if (/\bmid\b/i.test(String(date))) month = 6;
  if (/\blate\b/i.test(String(date))) month = 11;

  return Number(year) * 100 + month;
}

function extractLinks(text) {
  const urls = [...text.matchAll(/https?:\/\/[^\s),;]+/g)].map((match) => match[0]);
  const uniqueUrls = [...new Set(urls)];

  return uniqueUrls.map((url) => ({
    url,
    label: labelForUrl(url)
  }));
}

function labelForUrl(url) {
  if (url.includes("arxiv.org")) return "arXiv";
  if (url.includes("github.com")) return "GitHub";
  if (url.includes("huggingface.co")) return "Hugging Face";
  if (url.includes("nature.com")) return "Nature";
  if (url.includes("seed.bytedance.com") || url.includes("research.doubao.com")) return "ByteDance";
  if (url.includes("sensetime.com")) return "SenseTime";
  if (url.includes("kimi.com")) return "Kimi";
  if (url.includes("z.ai")) return "Z.ai";
  if (url.includes("stepfun.com")) return "StepFun";
  if (url.includes("antgroup.com")) return "Ant Group";
  if (url.includes("ernie.baidu.com") || url.includes("yiyan.baidu.com")) return "Baidu";
  if (url.includes("qwenlm.github.io")) return "Qwen Blog";
  return "Source";
}

function cleanDescription(text) {
  return text
    .replace(/\([^)]*https?:\/\/[^)]*\)/g, "")
    .replace(/https?:\/\/[^\s),;]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function populateFilters() {
  populateSelect(els.company, ["All", ...unique("company")]);
  populateSelect(els.vertical, ["All", ...unique("vertical")]);
}

function populateSelect(select, values) {
  select.innerHTML = values
    .map((value) => `<option value="${escapeHtml(String(value))}">${escapeHtml(String(value))}</option>`)
    .join("");
}

function unique(key) {
  return [...new Set(catalogItems.map((item) => item[key]).filter(Boolean))].sort();
}

function bindEvents() {
  els.search.addEventListener("input", (event) => {
    state.search = event.target.value.toLowerCase();
    render();
  });

  els.company.addEventListener("change", (event) => {
    state.company = event.target.value;
    render();
  });

  els.vertical.addEventListener("change", (event) => {
    state.vertical = event.target.value;
    render();
  });

  els.reset.addEventListener("click", () => {
    state.search = "";
    state.company = "All";
    state.vertical = "All";
    els.search.value = "";
    els.company.value = "All";
    els.vertical.value = "All";
    render();
  });
}

function getFilteredItems() {
  return catalogItems.filter((item) => {
    return (
      (!state.search || item.searchText.includes(state.search)) &&
      (state.company === "All" || item.company === state.company) &&
      (state.vertical === "All" || item.vertical === state.vertical)
    );
  });
}

function render() {
  const items = getFilteredItems();
  els.count.textContent = `Showing ${items.length} of ${catalogItems.length} entries`;

  if (!items.length) {
    els.table.innerHTML = `<tr><td class="empty" colspan="5">No entries match these filters.</td></tr>`;
    return;
  }

  els.table.innerHTML = items
    .map(
      (item) => `
        <tr>
          <td>${renderCompanyLogo(item.company)}</td>
          <td>
            <span class="technique">${escapeHtml(item.title)}</span>
          </td>
          <td>${escapeHtml(item.vertical)}</td>
          <td>${escapeHtml(item.description)}</td>
          <td>
            <div class="link-stack">
              ${
                item.links.length
                  ? item.links
                      .map(
                        (link) =>
                          `<a class="source-link" href="${escapeAttribute(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`
                      )
                      .join("")
                  : `<span class="meta">No link</span>`
              }
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

function renderCompanyLogo(company) {
  const src = companyLogos[company];
  const label = escapeHtml(company);
  const logoClass = company === "ByteDance Seed" ? " company-logo-wide" : "";

  if (!src) {
    return `<span class="company-name company-name-visible">${label}</span>`;
  }

  return `
    <span class="company-logo-wrap" title="${escapeAttribute(company)}" aria-label="${escapeAttribute(company)}">
      <img
        class="company-logo${logoClass}"
        src="${escapeAttribute(src)}"
        alt=""
        loading="lazy"
        onerror="this.parentElement.classList.add('is-missing')"
      />
      <span class="company-name">${label}</span>
    </span>
  `;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

init();
