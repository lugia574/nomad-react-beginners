const useTabs = (initialTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  const [currentIndex, setCurrnetIndex] = useState(initialTab);

  return {
    currentItem: allTabs[currentIndex],
    chageItem: setCurrnetIndex,
  };
};
