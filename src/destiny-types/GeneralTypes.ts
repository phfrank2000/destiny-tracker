export interface DestinyResponse<T> {
    Response: T;
    ErrorCode: number;
    ThrottleSeconds: number;
    ErrorStatus: string;
    Message: string;
    MessageData: JSON;
}

export enum Platform {
    XBOX = 1,
    PLAYSTATION = 2,
}

export interface Image {
    rect: ImageSize;
    sheetPath: string;
    sheetSize: ImageSize;
}

interface ImageSize {
    x: number;
    y: number;
    height: number;
    width: number;
}
