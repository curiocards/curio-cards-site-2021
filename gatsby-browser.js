// Prevent scrolling when clicking a new card (on desktop)
exports.shouldUpdateScroll = () => {
  if (window.matchMedia("only screen and (min-width: 1280px)").matches) {
    return false;
  }

  return true;
}