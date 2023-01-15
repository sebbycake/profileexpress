// verify response token backend

export default async function handler(req, res) {

    switch (req.method) {
        case 'POST':
            // const {token} = req.body;
            const token = "03AD1IbLBXYG_coD6LpRUU8apyhDWQ42KDGi7VJ8MlfVntiogYB3BZQ8clCPOTAcpLifvytS-C6YLVR_qQclowEWtasfO-5pzBZ-ww0uJeIthtmeiZjFZD3chxcRRZRKtvYBOj6xn3wBrrkZSjdMWY7et-8HDI-wiWCH777MO77OTBKjsyEsHJERoGq8jRDsBrkKldbfpamnkxjty2gfOPc9rDKU9TSabfIf_4_Xyv475LBK09avrgpKOaDqGH-5K9kSnb-EuAfnfHi7UphSrvR3WUlQWfqP3B1BuNJ-7AeNRm72vYks4hR_BcLylt8fMg3UIAfoYgSlk8A8-ubABYmIIAoQKWAgHYzVpxlH5d_BLPZX5OX5dndDdad7dgLT4M6idobKOFGsorbCnTAb8YKBNbkbxMddcsV_ZX2HiaHeXcigqhOmHefQSDV8993ObHN729U6hTB-z3tehbQUj4SnBGu5Q2cXcZsDi1L8scEI1vI3Qw9zIwkM-hQKW7u2v5QuuSoB90xTb5Yrq4rN8TmpUZJ-R2u9QGbg"
            
            fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`, {
                    method: 'POST'
            })
            .then((response) => {
                if (response.status == 200) {
                    res.status(200).json({'status': 'Human'});

                }
            })
            .catch(error => {
                res.status(400).json({'status': 'Robot'});
            })
            
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}