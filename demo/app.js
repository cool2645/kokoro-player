import { Router } from '@vaadin/router'
import Kokoro from 'kokoro'

import { connect, Player } from '../'
import { routes } from './nav'
import './solo'
import './playlist'
import './lyrics'
import './source'

window.player = new Kokoro()
window.customElements.define('kokoro-player', Player)
window.customElements.define('kokoro-provider', connect(window.player))

const router = new Router(document.getElementById('app'))
router.setRoutes(routes)
