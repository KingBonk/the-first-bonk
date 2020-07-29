console.log("Hello from DS14!");
let viz;
// Create a variable for the URL
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
// Create a variable for the vizContainer
const vizContainer = document.getElementById("vizContainer");
// Create a variable for the viz options
const options = {
  device: "desktop",
  hideTabs: "true",
};
const hideButton = document.getElementById("hideButton");
hideButton.addEventListener("click", function () {
  console.log("Hello from the button");
  viz.hide();
  showButton.style.display = "inline";
  hideButton.style.display = "none";
});
const showButton = document.getElementById("showButton");
showButton.addEventListener("click", function () {
  console.log("Showing the viz");
  viz.show();
  showButton.style.display = "none";
  hideButton.style.display = "inline";
});
const pdfButton = document.getElementById("pdfButton");
pdfButton.addEventListener("click", function () {
  console.log("Generating PDF");
  viz.showExportPDFDialog();
});
const crosstabButton = document.getElementById("crosstabButton");
crosstabButton.addEventListener("click", function () {
  console.log("Exporting as Crosstab");
  viz.showExportCrossTabDialog();
});
const powerpointButton = document.getElementById("powerpointButton");
powerpointButton.addEventListener("click", function () {
  console.log("Generating Powerpoint");
  viz.showExportPowerPointDialog();
});
const filterButton = document.getElementById("filterButton");
filterButton.addEventListener("click", function () {
  console.log("Filtering Sales");
  getRangeValues();
});

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
  showButton.style.display = "none";
}

function getRangeValues() {
  // Get the values from the input
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log("Filtering", minValue, "to", maxValue);
  // Get the workbook
  const workbook = viz.getWorkbook();
  // Get active sheet
  const activeSheet = workbook.getActiveSheet();
  // Get all sheets in dashboard
  const sheets = activeSheet.getWorksheets();
  // Apply filter to the sheet with the sales measure
  const sheetToFilter = sheets[1];
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
}

document.addEventListener("DOMContentLoaded", initViz);
