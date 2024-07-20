export default function getURI() {
  return process.env.NODE_ENV === "development" ? "http://localhost:4000/" : process.env.NEXT_PUBLIC_API_URL_PROD;
}
