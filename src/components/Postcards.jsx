/**
 * Postcard renderers — two styles, both consume the same { message, signoff } pair.
 *
 * Polaroid: photo (from creator's post) + handwritten caption + signoff.
 * Vintage: GREETINGS FROM <brand> hero strip + handwritten body + signoff,
 *          stamp + postmark + sparkle accents auto-filled.
 */
import { useId } from 'react';

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
            <WavyPhotoSticker avatarUrl={signerAvatar} />
            <span className="pc-polaroid__sticker-edit" aria-hidden="true">✎</span>
          </button>
        ) : (
          <span className="pc-polaroid__sticker" aria-hidden="true">
            <WavyPhotoSticker avatarUrl={signerAvatar} />
          </span>
        )
      )}
    </div>
  );
}

/* Wavy photo sticker — the photo IS the frame, clipped to a gentle
   8-bump wave (no white ring). Built from a central disc + 8 outer
   bumps merged via a single <clipPath>, so the photo flows right
   up to the wavy edge. */
function WavyPhotoSticker({ avatarUrl }) {
  const uid = useId().replace(/:/g, '');
  const clipId = `wave-clip-${uid}`;
  return (
    <svg
      className="pc-polaroid__sticker-svg"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          {/* Central disc r=44 + 8 outer bumps r=8 at distance 46 →
              merge into a continuous wavy outline with ~4.5u
              amplitude. Subtle scallop, not a flower. */}
          <circle cx="50" cy="50" r="44" />
          <circle cx="50" cy="4"  r="8" />
          <circle cx="82.5" cy="17.5" r="8" />
          <circle cx="96" cy="50" r="8" />
          <circle cx="82.5" cy="82.5" r="8" />
          <circle cx="50" cy="96" r="8" />
          <circle cx="17.5" cy="82.5" r="8" />
          <circle cx="4" cy="50" r="8" />
          <circle cx="17.5" cy="17.5" r="8" />
        </clipPath>
      </defs>
      {/* Subtle pastel placeholder if no avatar yet. */}
      <rect
        x="0" y="0" width="100" height="100"
        fill="#fff5ef"
        clipPath={`url(#${clipId})`}
      />
      {avatarUrl && (
        <image
          href={avatarUrl}
          x="0" y="0" width="100" height="100"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />
      )}
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
