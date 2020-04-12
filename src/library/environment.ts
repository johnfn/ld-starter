export const IsProduction  = !window.location.href.includes("localhost");
export const IsDevelopment = !IsProduction;