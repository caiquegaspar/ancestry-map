export interface CoverageAreasInterface {
    [key: string]: CoverageArea;
}

export interface CoverageArea {
    countries: string[];
    label:     string;
    colors:    string[];
}
