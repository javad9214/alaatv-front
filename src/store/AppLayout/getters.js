const getters = {
  drawer: (state) => {
    return state.drawer
  },
  pageBuilderEditable: (state) => {
    return state.pageBuilderEditable
  },
  appBar: (state) => {
    return state.appBar
  },
  confirmDialog: (state) => {
    return state.confirmDialog
  },
  windowSize: (state) => {
    return state.windowSize
  },
  bubbleSize: (state) => {
    return state.bubbleSize
  },
  ColumnsWidth: (state) => {
    return state.ColumnsWidth
  },
  layoutHeaderType: (state) => {
    return state.layoutHeaderType
  },
  layoutLeftSideBarType: (state) => {
    return state.layoutLeftSideBarType
  },
  layoutRightSideBarType: (state) => {
    return state.layoutRightSideBarType
  },
  breadcrumbs: (state) => {
    return state.breadcrumbs
  },
  breadcrumbLoading: (state) => {
    return state.breadcrumbs.loading
  },
  breadcrumbsVisibility: (state) => {
    return state.breadcrumbs.visible
  },
  headerSize: (state) => {
    return state.headerSize
  },
  calculateContainerFullHeight: (state) => {
    let offset = 0
    // if there is a header
    if (state.layoutHeader || state.appBar) {
      offset = state.headerSize.height
    }
    // implemented when footer part added to project
    const calculatedHeight = `calc(100vh - ${offset}px)`
    return calculatedHeight
  }
}

export default getters
