import { createClient } from '@sanity/client'

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2025-02-19',
    useCdn: true,
})

export default client
