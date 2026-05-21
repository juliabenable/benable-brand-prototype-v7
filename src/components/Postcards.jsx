/**
 * Postcard renderers — two styles, both consume the same { message, signoff } pair.
 *
 * Polaroid: photo (from creator's post) + handwritten caption + signoff.
 * Vintage: GREETINGS FROM <brand> hero strip + handwritten body + signoff,
 *          stamp + postmark + sparkle accents auto-filled.
 */

export function PolaroidPostcard({
  thumbnailUrl, platform, brandName, message, signoff,
  signerAvatar, onSignerAvatarClick,
}) {
  return (
    <div className="pc pc-polaroid">
      <div className="pc-polaroid__tape" />
      <div
        className="pc-polaroid__photo"
        style={thumbnailUrl ? { backgroundImage: `url(${thumbnailUrl})` } : undefined}
      >
        {platform && (
          <span className="pc-polaroid__platform-tag">{platformIcon(platform)} {platform}</span>
        )}
      </div>
      <div className="pc-polaroid__caption">{message || 'we love what you made!'}</div>
      <div className="pc-polaroid__signoff">{signoff || `— ${brandName || ''}`}</div>
      {signerAvatar !== undefined && (
        onSignerAvatarClick ? (
          <button
            type="button"
            className="pc-polaroid__sticker pc-polaroid__sticker--editable"
            onClick={(e) => { e.stopPropagation(); onSignerAvatarClick(); }}
            aria-label="Change signer photo"
            title="Click to change photo"
          >
            <ScallopedSticker />
            <span
              className="pc-polaroid__sticker-photo"
              style={signerAvatar ? { backgroundImage: `url(${signerAvatar})` } : undefined}
            />
            <span className="pc-polaroid__sticker-edit" aria-hidden="true">✎</span>
          </button>
        ) : (
          <span className="pc-polaroid__sticker" aria-hidden="true">
            <ScallopedSticker />
            <span
              className="pc-polaroid__sticker-photo"
              style={signerAvatar ? { backgroundImage: `url(${signerAvatar})` } : undefined}
            />
          </span>
        )
      )}
    </div>
  );
}

/* Scalloped "sticker" background — 12-petal flower around a center disc. */
function ScallopedSticker() {
  return (
    <svg
      className="pc-polaroid__sticker-bg"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <g fill="#ffffff">
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="6"  r="10" />
        <circle cx="72" cy="12" r="10" />
        <circle cx="88" cy="28" r="10" />
        <circle cx="94" cy="50" r="10" />
        <circle cx="88" cy="72" r="10" />
        <circle cx="72" cy="88" r="10" />
        <circle cx="50" cy="94" r="10" />
        <circle cx="28" cy="88" r="10" />
        <circle cx="12" cy="72" r="10" />
        <circle cx="6"  cy="50" r="10" />
        <circle cx="12" cy="28" r="10" />
        <circle cx="28" cy="12" r="10" />
      </g>
    </svg>
  );
}

export function VintagePostcard({ brandName, message, signoff, date }) {
  const dateLabel = (date || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  return (
    <div className="pc pc-vintage">
      <div className="pc-vintage__hero">
        <div className="pc-vintage__hero-sub">GREETINGS FROM</div>
        <div className="pc-vintage__hero-stars">✦ ✦ ✦</div>
        <div className="pc-vintage__hero-text">{brandName}</div>
      </div>
      <div className="pc-vintage__stamp" aria-hidden="true">♥</div>
      <div className="pc-vintage__postmark" aria-hidden="true">{dateLabel.split(' ')[0]}<br />{dateLabel.split(' ')[1]}</div>
      <div className="pc-vintage__body">
        <div className="pc-vintage__body-msg">{message || 'we love what you made!'}</div>
        <div className="pc-vintage__body-sig">{signoff || `— ${brandName}`}</div>
      </div>
      <div className="pc-vintage__confetti-1" aria-hidden="true">✦</div>
      <div className="pc-vintage__confetti-2" aria-hidden="true">·*✧</div>
    </div>
  );
}

function platformIcon(platform) {
  const p = platform.toLowerCase();
  if (p.includes('reel') || p.includes('instagram')) return '▶';
  if (p.includes('tiktok')) return '♪';
  if (p.includes('stor')) return '○';
  return '▶';
}
