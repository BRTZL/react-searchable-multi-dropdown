import React from "react";
import MultiDropdown, { DropdownItem } from "./components/MultiDropdown";

function App() {
	const numberItems: DropdownItem<number>[] = [
		{
			title: "One",
			subtitle: "Subtitle 1",
			value: 1,
			prefix: <img src="https://via.placeholder.com/40" alt="prefix" />,
		},
		{
			title: "Two",
			subtitle: "Subtitle 2",
			value: 2,
			prefix: <img src="https://via.placeholder.com/40" alt="prefix" />,
		},
		{
			title: "Three",
			subtitle: "Subtitle 3",
			value: 3,
			prefix: <img src="https://via.placeholder.com/40" alt="prefix" />,
		},
	];

	const [selectedItems, setSelectedItems] = React.useState<DropdownItem<number>[]>([]);

	return (
		<div
			style={{
				padding: "20px",
			}}
		>
			<MultiDropdown items={numberItems} selectedItems={selectedItems} onChange={setSelectedItems} containerStyle={{ maxWidth: "300px" }} />
		</div>
	);
}

export default App;
