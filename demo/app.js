import { Router } from '@vaadin/router'
import Kokoro from 'kokoro'

import { Provider } from '../'
import { routes } from './nav'
import './solo'
import './playlist'
import './lyrics'
import './source'

window.player = new Kokoro()
window.customElements.define('kokoro-provider', Provider.connect(window.player))

const router = new Router(document.getElementById('app'))
router.setRoutes(routes)
