import type { ProfileTypes } from '../../types/profileTypes'

type LinksProps = Pick<ProfileTypes, 'links'>;

const Links = ({ links }: LinksProps) => {
    return (
        <>
            <p>Links</p>
        </>
    )
}

export default Links