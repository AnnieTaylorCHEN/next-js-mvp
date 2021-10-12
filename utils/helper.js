export const filterBySelected = (allData, selectedFilterItems) => {
	const filteredData = allData.filter((data) => {
		for (let i = 0; i < selectedFilterItems.length; i += 1) {
			if (data.userId === selectedFilterItems[i]) {
				return true;
			}
		}
		return false;
	});
	return filteredData;
};
