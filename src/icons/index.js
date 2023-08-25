import SvgIcon from '../components/common/SvgIcon/index.vue' // svg component

// const req = require.context('./svg', false, /\.svg$/)
const req = import.meta.glob('./svg/*.svg')

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)

export default SvgIcon
