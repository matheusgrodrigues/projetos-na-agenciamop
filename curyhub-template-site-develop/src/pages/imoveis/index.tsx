// Native
import { GetServerSideProps } from "next";
import { createContext } from "react";

// Components
import Header from "../../components/section/ficha-produto/header";
import { Imovel } from "../../components/section/commons/imovel";
import SectionContato from "../../components/section/commons/section-contato";

// Helpers
import { checkPageDataToShow } from "../../helpers/theme/theme-page";

// Hooks
import { usePageTheme } from "../../hooks/theme";
import ThemeChamadasApi from "../../vendor/ThemeChamadasApi/ThemeChamadasApi";
import { remove_protocol } from "../../http/theme";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { host } = context.req.headers;

  const theme_chamadas_api = new ThemeChamadasApi(`${process.env.API_URL}`, "");
  const get_user_template = (await theme_chamadas_api.getTemplateByDomain(`${remove_protocol(`${host}`)}`));

  const { corretor, template } = get_user_template;

  if (corretor && corretor.user_active && template) {
    return {
      props: {
        template,
        corretor,
      },
    };
  }

  return {
    notFound: true,
  };
};

const page_name = "imoveis";

export default function PageImoveis({ corretor, template }: PageResponse) {
  const { theme, pageIsActive, themeSections } = usePageTheme(template, page_name);

  const ThemeProvider = createContext({
    corretor,
    template,
  });

  return (
    <ThemeProvider.Provider value={{ corretor, template }}>
      {checkPageDataToShow(corretor, theme, pageIsActive)
        ? themeSections &&
          themeSections.length > 0 &&
          themeSections.map((section) => {
            return (
              <div key={section.id}>
                {section.section_name === "header" ? (
                  <Header section={section} corretor_data={corretor} />
                ) : section.section_name === "secao-imovel" ? (
                  <Imovel section={section} corretor_data={corretor} />
                ) : section.section_name === "secao-contato" ? (
                  <SectionContato section={section} corretor_data={corretor} />
                ) : null}
              </div>
            );
          })
        : "Ocorreu um erro ao carregar esta página"}
    </ThemeProvider.Provider>
  );
}
