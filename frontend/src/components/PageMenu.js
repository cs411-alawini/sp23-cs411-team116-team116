import React from 'react'; 
import { Menu } from 'primereact/menu';

export default function PageMenu() {
    let items = [
        {label: 'Search Crime in your location', icon: 'pi pi-fw'},
        {label: 'Victims count by area', icon: 'pi pi-fw'},
        {label: 'Victims count by weapon', icon: 'pi pi-fw'},
        {label: 'Query History', icon: 'pi pi-fw'},
        {label: 'Crime data', icon: 'pi pi-fw'}
    ];

    return (
        <Menu model={items} className="custom-menu" />
    )
}