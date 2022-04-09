export default async function TemplatesService() {
  try {
    const r = await fetch('https://gist.githubusercontent.com/haikelfazzani/a74632b6777940828bd0cc0975f89fb5/raw/2358b8b741149828e98d9edaf4787174a90c60ae/kody-templates');
    const temp = await r.text();
    localStorage.setItem('templates', temp);
    return JSON.parse(temp);
  } catch (error) {

  }
}