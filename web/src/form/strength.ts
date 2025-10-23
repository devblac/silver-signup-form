const strengthScore = (pw: string): 0|1|2|3|4 => {
  let s: 0|1|2|3|4 = 0;
  if (pw.length >= 8) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  return s as 0|1|2|3|4;
}

export default strengthScore