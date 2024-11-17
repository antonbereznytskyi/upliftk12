const handler = (req, res) => {
    if (req.method === 'POST') {
        const secret_key = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY
        if (req.body.register_type == 'google') {
            res.status(200).json({
                status: true,
                message: 'Enquiry submitted successfully',
            })
        } else {
            try {
                fetch('https://www.google.com/recaptcha/api/siteverify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `secret=${secret_key}&response=${req.body.gRecaptchaToken}`,
                })
                    .then(reCaptchaRes => reCaptchaRes.json())
                    .then(reCaptchaRes => {
                        console.log(
                            reCaptchaRes,
                            'Response from Google reCaptcha verification API',
                        )
                        res.status(200).json({
                            status: reCaptchaRes.success,
                            message: 'Enquiry submitted successfully',
                        })
                    })
            } catch (err) {
                res.status(405).json({
                    status: 'failure',
                    message: 'Error submitting the enquiry form',
                })
            }
        }
    } else {
        res.status(405)
        res.end()
    }
}

export default handler
