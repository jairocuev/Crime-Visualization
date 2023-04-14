
export async function getGeoJson() {
  const res = await fetch("https://services3.arcgis.com/Et5Qfajgiyosiw4d/arcgis/rest/services/CrimeDataExport_2_view/FeatureServer/1/query?f=geojson&where=(report_Date%20%3E%3D%20DATE%20'2023-01-01'%20AND%20report_Date%20%3C%3D%20DATE%20'2023-05-11')&outFields=*&returnGeometry=true&resultRecordCount=2000");
  return res.json();

  
}

export async function getJson() {
  const res = await fetch("https://services3.arcgis.com/Et5Qfajgiyosiw4d/ArcGIS/rest/services/CrimeDataExport_2_view/FeatureServer/1/query?where=%28offense_start_date%3E%2701%2F1%2F2023%27%29+&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=report_Date%2C+offense_start_date&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=false&quantizationParameters=&sqlFormat=none&f=pjson&token=");
  return res.json();

  
}