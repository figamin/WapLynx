var catalogSorting = {};

// Patches catalog functions to call our sorting functions.
catalogSorting.init = function() {
  const oldSearch = catalog.search;
  catalog.search = function() {
    catalogSorting.sortThreads();
    oldSearch();
  };

  // if the catalog data was loaded before our script initialized,
  // then just kick start it
  if (catalog.catalogThreads) {
    catalogSorting.initSort();
  } else {
    // this hack is required because by the time catalogSorting.init executes,
    // catalog.getCatalogData() has executed but the response hasn't been received
    // yet, so we can trigger our actions when the data is being written by
    // catalog.getCatalogData.
    Object.defineProperty(catalog, "catalogThreads", {
      set: function(value) {
        // delete the custom setter
        delete catalog.catalogThreads;
        // replace with actual value
        catalog.catalogThreads = value;
        // call our hook
        catalogSorting.initSort();
      },
      configurable: true
    });
  }
};

// Sorts pinned thread first, then sorts by the given field in descending order.
catalog.sortByField = function(a, b, field) {
  if (a.pinned) return -1;
  else if (b.pinned) return 1;

  if ((a[field] || 0) > (b[field] || 0)) return -1;
  if ((a[field] || 0) < (b[field] || 0)) return 1;
  return 0;
};

// A list of methods to sort.
catalogSorting.methods = new Map([
  [
    "Bump order",
    function() {
      catalog.catalogThreads.sort(function(a, b) {
        return catalog.sortByField(a, b, "lastBump");
      });
    }
  ],
  [
    "Last reply",
    function() {
      catalog.catalogThreads.sort(function(a, b) {
        return catalog.sortByField(a, b, "lastReply");
      });
    }
  ],
  [
    "Creation date",
    function() {
      catalog.catalogThreads.sort(function(a, b) {
        return catalog.sortByField(a, b, "creation");
      });
    }
  ],
  [
    "Reply count",
    function() {
      catalog.catalogThreads.sort(function(a, b) {
        return catalog.sortByField(a, b, "postCount");
      });
    }
  ]
]);
// The current sorting method. Restored from persistence if possible.
catalogSorting.currentMethod =
  localStorage.getItem("catalogSort") || "Bump order";

// Updates the current sorting method, also persists it.
catalogSorting.updateMethod = function(value) {
  localStorage.setItem("catalogSort", value);
  catalogSorting.currentMethod = value;
};

// Uses the current sorting method to sort the threads.
catalogSorting.sortThreads = function() {
  catalogSorting.methods.get(catalogSorting.currentMethod)();
};

// Initializes the sorting menu.
catalogSorting.initSort = function() {
  const sortingLabel = document.createElement("label");
  sortingLabel.appendChild(document.createTextNode("Sort by: "));

  const sortSelect = document.createElement("select");

  catalogSorting.methods.forEach((value, key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = key;

    sortSelect.appendChild(option);
  });
  sortSelect.value = catalogSorting.currentMethod;

  sortSelect.addEventListener("change", function() {
    catalogSorting.updateMethod(this.value);
    catalog.search();
  });

  sortingLabel.appendChild(sortSelect);

  const divTools = document.getElementById("divTools");
  divTools.insertBefore(sortingLabel, divTools.firstChild);

  // do the initial sorted update
  catalog.search();
};

catalogSorting.init();
