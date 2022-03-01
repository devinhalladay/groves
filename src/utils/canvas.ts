// Cursor osition within the visible browser viewport
const cursorPositionInViewport = (event) => {
  let x, y;

  x = event.clientX;
  y = event.clientY;

  return { x, y };
};

// Cursor position within the entire page width and height
const cursorPositionInPage = (event) => {
  let x, y;

  x = event.pageX;
  y = event.pageY;

  return { x, y };
};

// Dimensions of the visible browser viewport
const viewportDimensions = () => {
  let width, height;

  width = window.innerWidth;
  height = window.innerHeight;

  return { width, height };
};

// Much of the below is sourced from this post by Ben Nadel:
// https://www.bennadel.com/blog/3460-automatically-scroll-the-window-when-the-user-approaches-the-viewport-edge-in-javascript.htm

// Determine whether we should adjust window scroll
const shouldScrollAtEdge = (windowData, e) => {
  if (
    !(
      windowData.isInLeftEdge ||
      windowData.isInRightEdge ||
      windowData.isInTopEdge ||
      windowData.isInBottomEdge
    )
  ) {
    clearTimeout(windowData.timer);
    return false;
  }

  return true;
};

// Adjust the window scroll based on the user's mouse position. Returns True
// or False depending on whether or not the window scroll was changed.
const adjustWindowScroll = (windowData) => {
  let documentWidth = Math.max(
    document.body.scrollWidth,
    document.body.offsetWidth,
    document.body.clientWidth,
    document.documentElement.scrollWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth,
  );

  let documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.body.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight,
  );

  // Calculate the maximum scroll offset in each direction. Since you can only
  // scroll the overflow portion of the document, the maximum represents the
  // length of the document that is NOT in the viewport.
  let maxScrollX = documentWidth - viewportDimensions().width;
  let maxScrollY = documentHeight - viewportDimensions().height;

  // Get the current scroll position of the document.
  let currentScrollX = window.pageXOffset;
  let currentScrollY = window.pageYOffset;

  // Determine if the window can be scrolled in any particular direction.
  let canScrollUp = currentScrollY > 0;
  let canScrollDown = currentScrollY < maxScrollY;
  let canScrollLeft = currentScrollX > 0;
  let canScrollRight = currentScrollX < maxScrollX;

  // Since we can potentially scroll in two directions at the same time,
  // let's keep track of the next scroll, starting with the current scroll.
  // Each of these values can then be adjusted independently in the logic
  // below.
  let nextScrollX = currentScrollX;
  let nextScrollY = currentScrollY;

  // As we examine the mouse position within the edge, we want to make the
  // incremental scroll changes more "intense" the closer that the user
  // gets the viewport edge. As such, we'll calculate the percentage that
  // the user has made it "through the edge" when calculating the delta.
  // Then, that use that percentage to back-off from the "max" step value.
  let maxStep = 50;

  // Should we scroll left?
  if (windowData.isInLeftEdge && canScrollLeft) {
    let intensity =
      (windowData.edgeLeft - windowData.cursorPosition.x) / windowData.edgeSize;

    nextScrollX = nextScrollX - maxStep * intensity;

    // Should we scroll right?
  } else if (windowData.isInRightEdge && canScrollRight) {
    let intensity =
      (windowData.cursorPosition.x - windowData.edgeRight) /
      windowData.edgeSize;

    nextScrollX = nextScrollX + maxStep * intensity;
  }

  // Should we scroll up?
  if (windowData.isInTopEdge && canScrollUp) {
    let intensity =
      (windowData.edgeTop - windowData.cursorPosition.y) / windowData.edgeSize;

    nextScrollY = nextScrollY - maxStep * intensity;

    // Should we scroll down?
  } else if (windowData.isInBottomEdge && canScrollDown) {
    let intensity =
      (windowData.cursorPosition.y - windowData.edgeBottom) /
      windowData.edgeSize;

    nextScrollY = nextScrollY + maxStep * intensity;
  }

  // Sanitize invalid maximums. An invalid scroll offset won't break the
  // subsequent .scrollTo() call; however, it will make it harder to
  // determine if the .scrollTo() method should have been called in the
  // first place.
  nextScrollX = Math.max(0, Math.min(maxScrollX, nextScrollX));
  nextScrollY = Math.max(0, Math.min(maxScrollY, nextScrollY));

  if (nextScrollX !== currentScrollX || nextScrollY !== currentScrollY) {
    window.scrollTo(nextScrollX, nextScrollY);
    return true;
  } else {
    return false;
  }
};

export {
  cursorPositionInViewport,
  cursorPositionInPage,
  viewportDimensions,
  shouldScrollAtEdge,
  adjustWindowScroll,
};
