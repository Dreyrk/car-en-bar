const headers = {
  "X-Api-Key": "B7YbHyE0OMig2+VqW9E70A==Abm8pQN1Ht8I8Zd5",
};
const options = {
  headers,
};

export async function getMake(search: string) {
  const url = `https://api.api-ninjas.com/v1/cars?make=${search}`;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.map(({ make }: { make: string }) => ({ label: make, value: make }));
  } catch (error) {
    console.error(error);
  }
}

export async function getModels(search: string, make: string) {
  const url = `https://api.api-ninjas.com/v1/cars?make=${make}&model=${search}`;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.map(({ model }: { model: string }) => ({ label: model, value: model }));
  } catch (error) {
    console.error(error);
  }
}
