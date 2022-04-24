import type { MapInterface } from '../../interfaces/map.interface';

const getters = {
  mapData: (state: { map_data: MapInterface[] }) =>
    state.map_data,
};

export default { ...getters };
