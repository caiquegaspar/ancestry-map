export interface ApiReturnInterface {
	personal_info: PersonalInfo;
	ancestry_info: AncestryInfo[];
}

export interface AncestryInfo {
	code:       string;
	percentage: string;
	name:       string;
}

export interface PersonalInfo {
	name:   string;
	age:    number;
	adress: string;
}
