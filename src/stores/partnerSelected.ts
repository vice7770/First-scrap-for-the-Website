import type { z } from "zod";
import { atom } from "nanostores";
import { partners,type Partner } from "../consts";

export const $selectedPartner = atom<Partner>(partners[0]);

export async function setSelectedPartner(partner: Partner) {
    $selectedPartner.set(partner);
}