// Google Books API Types
export interface ImageLinks {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
}

export interface VolumeInfo {
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: Array<{
        type: string;
        identifier: string;
    }>;
    readingModes?: {
        text: boolean;
        image: boolean;
    };
    pageCount?: number;
    printType?: string;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    maturityRating?: string;
    allowAnonLogging?: boolean;
    contentVersion?: string;
    panelizationSummary?: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
    };
    imageLinks?: ImageLinks;
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
}

export interface Book {
    kind?: string;
    id: string;
    etag?: string;
    selfLink?: string;
    volumeInfo: VolumeInfo;
    saleInfo?: {
        country: string;
        saleability: string;
        isEbook: boolean;
        listPrice?: {
            amount: number;
            currencyCode: string;
        };
        retailPrice?: {
            amount: number;
            currencyCode: string;
        };
        buyLink?: string;
    };
    accessInfo?: {
        country: string;
        viewability: string;
        embeddable: boolean;
        publicDomain: boolean;
        textToSpeechPermission: string;
        epub?: {
            isAvailable: boolean;
        };
        pdf?: {
            isAvailable: boolean;
        };
        webReaderLink?: string;
        accessViewStatus: string;
        quoteSharingAllowed: boolean;
    };
    searchInfo?: {
        textSnippet: string;
    };
}

