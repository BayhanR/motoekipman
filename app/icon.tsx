import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'MotoEkipman2.El'
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: '#070707',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#EF4444',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    borderRadius: '20%',
                    border: '2px solid #EF4444'
                }}
            >
                M
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
