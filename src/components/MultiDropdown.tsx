import React, { useState } from "react";

export interface DropdownItem<T> {
	title: string;
	subtitle?: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	value: T;
}

export interface MultiDropdownProps<T> {
	items: DropdownItem<T>[];
	selectedItems: DropdownItem<T>[];
	onChange: (items: DropdownItem<T>[]) => void;
	placeholder?: string; // Optional placeholder text
	containerStyle?: React.CSSProperties;
}

const MultiDropdown = <T,>({ items, selectedItems, onChange, placeholder = "Select Items", containerStyle }: MultiDropdownProps<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
	const [searchText, setSearchText] = useState("");
	const textFieldRef = React.useRef<HTMLInputElement>(null);

	const toggleDropdown = () => {
		if (isTextFieldFocused) {
			return;
		}
		setIsOpen(!isOpen);
	};

	const handleSelect = (item: DropdownItem<T>) => {
		if (selectedItems.some((selectedItem) => selectedItem.value === item.value)) {
			onChange(selectedItems.filter((i) => i.value !== item.value));
		} else {
			onChange([...selectedItems, item]);
		}
	};

	const showTextField = () => {
		setIsTextFieldFocused(true);
		setIsOpen(true);
		if (textFieldRef.current) {
			textFieldRef.current.focus();
		}
	};

	const hideTextField = () => {
		setIsTextFieldFocused(false);
	};

	const filteredItems = React.useMemo(() => {
		if (searchText === "") {
			return items;
		}
		return items.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()));
	}, [items, searchText]);

	return (
		<div style={containerStyle}>
			<div
				style={{
					background: "white",
					border: "1px solid #ccc",
					borderRadius: "8px",
					width: "100%",
					height: "24px",
					display: "flex",
					alignItems: "center",
					textAlign: "start",
					cursor: "pointer",
					padding: "10px 16px",
					userSelect: "none",
				}}
				onClick={toggleDropdown}
			>
				{isTextFieldFocused ? (
					<input
						ref={textFieldRef}
						type="text"
						placeholder={placeholder}
						onFocus={showTextField}
						onBlur={hideTextField}
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						autoFocus
						style={{
							border: "none",
							outline: "none",
							width: "100%",
						}}
					/>
				) : selectedItems.length === 0 ? (
					<span onClick={showTextField}>{placeholder}</span>
				) : (
					<div
						style={{
							width: "100%",
							display: "flex",
							flexWrap: "wrap",
							gap: "5px",
						}}
						onClick={showTextField}
					>
						{selectedItems.map((item) => (
							<div
								key={`dropdown-selected-item-${JSON.stringify(item.value)}`}
								style={{
									display: "flex",
									alignItems: "center",
									background: "lightgrey",
									borderRadius: "5px",
									padding: "2px 4px",
									gap: "8px",
								}}
							>
								{item.title}

								<button onClick={() => handleSelect(item)}>x</button>
							</div>
						))}
					</div>
				)}

				{/* TODO: add chevron up down */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-chevron-down"
					viewBox="0 0 16 16"
					style={{ marginLeft: "auto", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
				>
					<path
						fillRule="evenodd"
						d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
					/>
				</svg>
			</div>

			{isOpen && (
				<ul
					style={{
						listStyle: "none",
						padding: 0,
						margin: "5px",
					}}
				>
					{filteredItems.map((item) => (
						<li
							style={{
								padding: "5px",
								cursor: "pointer",
								display: "flex",
								gap: "6px",
							}}
							key={JSON.stringify(item.value)}
							onClick={() => handleSelect(item)}
						>
							<input
								type="checkbox"
								checked={selectedItems.some((selectedItem) => selectedItem.value === item.value)}
								onChange={() => handleSelect(item)}
							/>

							{item.prefix}

							<div
								style={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								<span>{item.title}</span>
								{item.subtitle && <span style={{ fontSize: "0.8em" }}>{item.subtitle}</span>}
							</div>

							{item.suffix}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MultiDropdown;
