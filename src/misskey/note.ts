import { Bot } from '../bot';
import NGWord from '../ng-words';
import { TextProcess } from '../utils/text-process';
import { User } from './api';

export interface Reactions {
    [key: string]: number;
}

type Visibilities = 'public' | 'home' | 'followers' | 'specified';

export interface CreatedNote {
    id: string;
    createdAt: Date;
    userId: string;
    user: User;
    text?: string;
    cw: string | null;
    visibility: Visibilities;
    renoteCount: number;
    repliesCount: number;
    reactions: Reactions;
    emojis: string[];
    fileIds: string[];
    files: string[];
    replyId?: string;
    renoteId?: string;
    reply?: CreatedNote;
    renote?: CreatedNote;
}

export class Note {
    private bot: Bot;
    public note: CreatedNote;
    private tp: TextProcess;
    private _text: string;
    constructor(bot: Bot, note: CreatedNote) {
        this.bot = bot;
        this.note = {
            ...note,
            createdAt: new Date(note.createdAt),
        };
        this._text = note.text || '';
        this.tp = new TextProcess(this._text);
    }

    get screenId(): string {
        const user = this.note.user;
        return `@${user.username}${user.host ? `@${user.host}` : ''}`;
    }

    get text(): string {
        return this._text;
    }

    removeURLs(): Note {
        this._text = this.tp.removeURLs().toString();
        return this;
    }

    removeMentions(): Note {
        this._text = this.tp.removeMentions().toString();
        return this;
    }

    removeMentionToMe(): Note {
        this._text = this.tp.removeMentionToMe().toString();
        return this;
    }

    findNGWord(ngWord: NGWord): string | undefined {
        return this.tp.findNGWord(ngWord);
    }

    reply({ text, visibility = this.note.visibility, cw }: { text: string; visibility?: Visibilities; cw?: string }): void {
        this.bot.api.postText({ text, visibility, replyId: this.note.id, cw }).catch((err) => {
            throw new Error(err);
        });
    }

    reaction(reaction = '🍮'): void {
        this.bot.api.reactionToNote(this.note.id, reaction).catch((err) => {
            throw new Error(err);
        });
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNote(note: Record<string, any>): note is CreatedNote {
    return 'visibility' in note;
}
