import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

storage.recrypt('hunter2')
