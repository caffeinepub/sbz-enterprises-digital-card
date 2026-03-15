import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Link {
    id: bigint;
    url: string;
    desc: string;
    name: string;
    emoji: string;
}
export interface backendInterface {
    addLinkWithPin(name: string, url: string, desc: string, emoji: string, pin: string): Promise<boolean>;
    getAllLinks(): Promise<Array<Link>>;
    getDefaultLinks(): Promise<Array<Link>>;
    removeLinkWithPin(id: bigint, pin: string): Promise<boolean>;
}
