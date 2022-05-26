import type { MapInterface } from "interfaces/map.interface";
import type { CoverageAreasInterface } from "interfaces/coverage.interface";
import type { ApiReturnInterface } from "interfaces/api.interface";

const getters = {
	mapData: (state: {
		user_info: any;
		coverage_areas: CoverageAreasInterface;
		map_data: MapInterface[];
	}) => {
		const { user_info, coverage_areas, map_data } = state;

		const regions = Object.keys(user_info.ancestry_info);
		const highlightedCountries = regions.reduce(
			(acc: string[], obj: string) =>
				(acc = [...acc, ...coverage_areas[obj].countries]),
			[]
		);
		const returnArr = map_data.map((item) => {
			const highlight = highlightedCountries.includes(item.initials);

			highlight ? (item.highlighted = true) : (item.highlighted = false);
			return item;
		});

		return returnArr;
	},

	userData: (state: {
		user_info: any;
		coverage_areas: CoverageAreasInterface;
	}): ApiReturnInterface => {
		const { user_info, coverage_areas } = state;
		console.log(user_info);

		const regionsArr = Object.entries(user_info.ancestry_info);
		const regions = regionsArr.reduce(
			(acc: any, obj: [string, unknown]) =>
				(acc = [
					...acc,
					{
						code: obj[0],
						percentage: obj[1] + "%",
						name: coverage_areas[obj[0]].label,
					},
				]),
			[]
		);
		const returnArr = {
			ancestry_info: regions,
			personal_info: user_info.personal_info,
		};

		return returnArr;
	},
};

export default { ...getters };
