// Token va role ni saqlash funksiyasi
export function saveAuthData(token: string, role: string) {
    localStorage.setItem('Token', token);
    localStorage.setItem('Role', role);

}

// Token va role ni olish funksiyasi
export function getAuthData() {
    const token = localStorage.getItem('Token');
    const role = localStorage.getItem('Role');
    return { token, role };
}
// Token va role ni o'chirish funksiyasi
export function clearAuthData() {
    localStorage.removeItem('Token');
    localStorage.removeItem('Role');

}

// Misol uchun foydalanish
// Saqlash
// saveAuthData('example-token-12345', 'MASTER');

// Olish
// const { token, role } = getAuthData();
// console.log('Token:', token);
// console.log('Role:', role);

// // O'chirish
// clearAuthData();
