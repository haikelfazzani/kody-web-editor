export default async function TemplatesService() {
  try {
    const r = await fetch('https://gist.githubusercontent.com/haikelfazzani/a74632b6777940828bd0cc0975f89fb5/raw/c3a80c327d0e232d003cddf7dd1494597aa1b78c/kody-templates');
    const temp = await r.text();
    localStorage.setItem('templates', temp);
    return JSON.parse(temp);
  } catch (error) {

  }
}