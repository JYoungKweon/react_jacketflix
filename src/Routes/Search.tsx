import { useLocation } from "react-router";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyworkd");
  console.log(keyword);
  return null;
}

export default Search;
