declare module MyAnimeListAPI {

    export interface SearchResponse {
        categories: Array<Category>
    }

    export interface Category {
        type: string,
        items: Array<Item>
    }

    export interface Item {
        id: number,
        image_url: string,
        name: string,
        payload: Payload,
        thumbnail_url: string,
        type: string,
        url: string
    }

    export interface Payload {
        aired: string,
        media_type: string,
        score: string,
        start_year: number,
        status: string
    }
}

export default MyAnimeListAPI;