import { replace } from "react-router";

export async function loader() {
  return replace('./account');
}
