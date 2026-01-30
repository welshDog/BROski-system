import React from 'react';
const plugins = {
    physical: () => import('./PhysicalMaterial')
};
export function getMaterialPlugin(id) {
    const loader = plugins[id];
    if (!loader)
        return null;
    return React.lazy(loader);
}
