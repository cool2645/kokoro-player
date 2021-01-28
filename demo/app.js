import { Router } from '@vaadin/router'
import Kokoro from 'kokoro'

import { Provider, Player, SingleCard, PlaylistCard } from '../'
import { routes } from './nav'
import './solo'
import './playlist'
import './lyrics'
import './source'

window.player = new Kokoro()
window.customElements.define('kokoro-player', Player)
window.customElements.define('kokoro-single-card', SingleCard)
window.customElements.define('kokoro-playlist-card', PlaylistCard)
window.customElements.define('kokoro-provider', Provider.connect(window.player))

const router = new Router(document.getElementById('app'))
router.setRoutes(routes)
