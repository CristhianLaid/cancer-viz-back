import * as bcrypt from 'bcrypt';


interface Props {
    hasSync: (password:string, leap?:number) => string;
    compareSync: (password:string, hash:string) => boolean;
}

export const bcryptPlugin: Props = {
    hasSync: (password:string, leap=10) => bcrypt.hashSync(password, leap),
    compareSync: (password:string, hash:string) => bcrypt.compareSync(password, hash)
};