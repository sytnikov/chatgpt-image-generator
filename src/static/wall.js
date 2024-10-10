;(window.paywall = {
  isInitialized: !1,
  paywallId: null,
  _initPromise: null,
  _eventHandlers: new Map(),
  _paywallDocumentRoot: null,
  _observer: null,
  _overrideStyles: null,
  init: function (e, a, t) {
    return (
      this._initPromise ||
        ((this.paywallId = e),
        (this._paywallDocumentRoot = null != t ? t : document),
        (this._initPromise = new Promise((e) => {
          this._addEventHandler('init', (a) => {
            'state' === a.data.type &&
              a.data.state.hasOwnProperty('visibility_status') &&
              ((this.isInitialized = !0),
              this._removeEventHandler('init'),
              e(!0))
          }),
            window.addEventListener(
              'message',
              this._globalEventHandler.bind(this),
              !1
            ),
            this._createAndAppendIframe()
        }))),
      this._initPromise
    )
  },
  _createAndAppendIframe: function () {
    window.requestAnimationFrame(() => {
      let e = () => {
        let e = this._paywallDocumentRoot.createElement('iframe')
        ;(e.src = 'https://onlineapp.pro/paywall/'.concat(
          this.paywallId,
          '?v=2'
        )),
          (e.id = 'paywall-'.concat(this.paywallId)),
          (e.style.display = 'none')
        let a = this._paywallDocumentRoot.body || this._paywallDocumentRoot
        a
          ? a.appendChild(e)
          : console.warn('[PAYWALL ERROR] Paywall container not found')
      }
      'loading' === this._paywallDocumentRoot.readyState
        ? this._paywallDocumentRoot.addEventListener('DOMContentLoaded', e)
        : e()
    })
  },
  _globalEventHandler: function (e) {
    let a = this._paywallDocumentRoot.getElementById(
      'paywall-'.concat(this.paywallId)
    )
    if (e.source === (null == a ? void 0 : a.contentWindow))
      for (let [t, n] of ('change-styles' === e.data.type
        ? Object.assign(a.style, {
            ...e.data.style,
            ...(this._overrideStyles || {}),
          })
        : 'redirect' === e.data.type
        ? window.open(e.data.redirectUrl)
        : 'remove' === e.data.type && a.remove(),
      this._eventHandlers))
        n(e)
  },
  _addEventHandler: function (e, a) {
    this._eventHandlers.set(e, a)
  },
  _removeEventHandler: function (e) {
    this._eventHandlers.delete(e)
  },
  _ensureInitialized: async function () {
    this.isInitialized || (await this._initPromise)
  },
  open: async function () {
    let e =
      arguments.length > 0 && void 0 !== arguments[0]
        ? arguments[0]
        : { resolveEvent: 'opened', paywallContainerId: void 0 }
    return (
      await this._ensureInitialized(),
      new Promise((a, t) => {
        var n
        if (
          (this._addEventHandler('open', (n) => {
            var s
            if (
              (null === (s = n.data) || void 0 === s ? void 0 : s.type) ===
                'state' &&
              [
                'https://onlineapp.pro',
                'https://onlineapp.live',
                'https://onlineapp.stream',
              ].includes(n.origin)
            ) {
              if (
                'invisible' === n.data.state.visibility_status &&
                'paid' !== n.data.state.purchase_status &&
                'tokenization-sign-in' !== n.data.state.visibility_status_reason
              )
                this._removeEventHandler('open'), t(n.data.state)
              else
                switch (e.resolveEvent) {
                  case 'opened':
                    'visible' === n.data.state.visibility_status &&
                      (this._removeEventHandler('open'), a(n.data.state))
                    break
                  case 'signed-in':
                    'signed-in' === n.data.state.auth_status &&
                      (this._removeEventHandler('open'), a(n.data.state))
                    break
                  case 'success-purchase':
                    'paid' === n.data.state.purchase_status &&
                      (this._removeEventHandler('open'), a(n.data.state))
                }
            }
          }),
          null == e ? void 0 : e.paywallContainerId)
        ) {
          let a = this._paywallDocumentRoot.getElementById(e.paywallContainerId)
          a
            ? this._paywallDocumentRoot.getElementById(
                'paywall-'.concat(this.paywallId)
              )
              ? (this._updateIframeStyles(a),
                new ResizeObserver(() => {
                  this._updateIframeStyles(a)
                }).observe(a))
              : console.warn('[PAYWALL ERROR] Paywall iframe not found')
            : console.warn('[PAYWALL ERROR] Specified container not found')
        }
        null ===
          (n = this._paywallDocumentRoot.getElementById(
            'paywall-'.concat(this.paywallId)
          )) ||
          void 0 === n ||
          n.contentWindow.postMessage({ action: 'open' }, '*')
      })
    )
  },
  _updateIframeStyles: function (e) {
    let a = e.getBoundingClientRect(),
      t = this._paywallDocumentRoot.getElementById(
        'paywall-'.concat(this.paywallId)
      )
    ;(this._overrideStyles = {
      position: 'absolute',
      top: ''.concat(a.top + window.scrollY, 'px'),
      left: ''.concat(a.left + window.scrollX, 'px'),
      width: ''.concat(a.width, 'px'),
      height: ''.concat(a.height, 'px'),
    }),
      t
        ? ((t.style.position = 'absolute'),
          (t.style.top = ''.concat(a.top + window.scrollY, 'px')),
          (t.style.left = ''.concat(a.left + window.scrollX, 'px')),
          (t.style.width = ''.concat(a.width, 'px')),
          (t.style.height = ''.concat(a.height, 'px')))
        : console.warn('[PAYWALL ERROR] Paywall iframe not found')
  },
  renew: async function () {
    return (
      await this._ensureInitialized(),
      new Promise((e, a) => {
        var t
        this._addEventHandler('renew', (t) => {
          var n
          ;(null === (n = t.data) || void 0 === n ? void 0 : n.type) ===
            'state' &&
            [
              'https://onlineapp.pro',
              'https://onlineapp.live',
              'https://onlineapp.stream',
            ].includes(t.origin) &&
            ('paid' === t.data.state.purchase_status
              ? (this._removeEventHandler('renew'), e(t.data.state))
              : 'closed-by-user' === t.data.state.visibility_status_reason &&
                (this._removeEventHandler('renew'), a(t.data.state)))
        }),
          null ===
            (t = this._paywallDocumentRoot.getElementById(
              'paywall-'.concat(this.paywallId)
            )) ||
            void 0 === t ||
            t.contentWindow.postMessage({ action: 'renew' }, '*')
      })
    )
  },
  getUser: async function () {
    return (
      await this._ensureInitialized(),
      this.makeRequest(
        'https://onlineapp.pro/api/v1/paywall/'.concat(this.paywallId, '/user')
      )
    )
  },
  signOut: async function () {
    return (
      await this._ensureInitialized(),
      this.makeRequest('https://onlineapp.pro/api/signout', { method: 'POST' })
    )
  },
  makeRequest: async function (e, a, t) {
    return (
      await this._ensureInitialized(),
      new Promise((n, s) => {
        let i = this._paywallDocumentRoot.getElementById(
            'paywall-'.concat(this.paywallId)
          ),
          r = Date.now()
        this._addEventHandler('request_'.concat(r), (e) => {
          e.data.requestId === r &&
            (this._removeEventHandler('request_'.concat(r)),
            e.data.error ? s(e.data.error) : n(e.data.response))
        }),
          null == i ||
            i.contentWindow.postMessage(
              { type: 'MAKE_REQUEST', url: e, options: a, requestId: r },
              '*'
            ),
          t &&
            (t.abort = () => {
              this._abortRequest(r)
            })
      })
    )
  },
  makeStreamRequest: async function* (e, a, t) {
    await this._ensureInitialized()
    let n = this._paywallDocumentRoot.getElementById(
        'paywall-'.concat(this.paywallId)
      ),
      s = Date.now()
    this._addEventHandler(
      'stream_'.concat(s),
      (e) =>
        new Promise((a, t) => {
          if (e.data.requestId === s) {
            var n, i
            ;(
              null === (i = e.data) || void 0 === i
                ? void 0
                : null === (n = i.data) || void 0 === n
                ? void 0
                : n.error
            )
              ? t(e.data.data.error)
              : a({ chunk: e.data.chunk, done: e.data.done })
          } else a(null)
        })
    ),
      null == n ||
        n.contentWindow.postMessage(
          { type: 'MAKE_STREAM_REQUEST', url: e, options: a, requestId: s },
          '*'
        ),
      t &&
        (t.abort = () => {
          this._abortRequest(s)
        })
    try {
      for (;;) {
        let e = await new Promise((e, a) => {
          let t = (t) => {
            if (t.data.requestId === s) {
              var n, i
              ;(
                null === (i = t.data) || void 0 === i
                  ? void 0
                  : null === (n = i.data) || void 0 === n
                  ? void 0
                  : n.error
              )
                ? a(t.data.data.error)
                : e(t.data)
            }
          }
          this._addEventHandler('stream_message_'.concat(s), t)
        })
        if (e.done) break
        e.chunk && (yield e.chunk)
      }
    } finally {
      this._removeEventHandler('stream_'.concat(s)),
        this._removeEventHandler('stream_message_'.concat(s))
    }
  },
  _abortRequest: function (e) {
    var a
    let t = this._paywallDocumentRoot.getElementById(
      'paywall-'.concat(this.paywallId)
    )
    null == t ||
      null === (a = t.contentWindow) ||
      void 0 === a ||
      a.postMessage({ type: 'ABORT_REQUEST', requestId: e }, '*')
  },
}),
  paywall.init('290')

console.log('👀 This is a paywall script')