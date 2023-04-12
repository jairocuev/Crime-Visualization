export async function getGeoJson() {
  const res = await fetch("https://services3.arcgis.com/Et5Qfajgiyosiw4d/arcgis/rest/services/CrimeDataExport_2_view/FeatureServer/1/query?f=geojson&where=(report_Date%20%3E%3D%20DATE%20'2023-01-01'%20AND%20report_Date%20%3C%3D%20DATE%20'2023-04-11')&outFields=*&returnGeometry=true&resultRecordCount=2000");
  return res.json();

  
}
