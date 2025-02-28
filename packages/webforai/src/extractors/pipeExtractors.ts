import type { Nodes as Hast } from "hast";
import { DEFAULT_EXTRACTORS } from "../constants";
import type { ExtractParams, Extractor } from "./types";

export type ExtractorSelector = Extractor | false;
export type ExtractorSelectors = ExtractorSelector | ExtractorSelector[];

export const pipeExtractors = (params: ExtractParams, extractors: ExtractorSelectors = DEFAULT_EXTRACTORS): Hast => {
	const { hast, lang } = params;
	const _extractors = Array.isArray(extractors) ? extractors : [extractors];

	const extracted =
		_extractors.reduce<Hast>((acc, extractor) => {
			if (extractor === false) {
				return acc;
			}
			if (typeof extractor === "function") {
				return extractor({ hast: acc, lang });
			}
			throw new Error(`Invalid extractor: ${extractor}`);
		}, hast) || hast;

	return extracted;
};
