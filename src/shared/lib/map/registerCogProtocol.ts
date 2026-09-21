import { cogProtocol } from "@geomatico/maplibre-cog-protocol";
import { addProtocol } from "maplibre-gl";

let isCogProtocolRegistered = false;

export function registerCogProtocol() {
  if (isCogProtocolRegistered) return;

  addProtocol("cog", cogProtocol);
  isCogProtocolRegistered = true;
}
