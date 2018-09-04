import sequelize from 'sequelize';

const DirectorySchema =
  {
    andrew_id: { type: sequelize.Sequelize.STRING },
    biography: { type: sequelize.Sequelize.STRING },
    display_email: { type: sequelize.Sequelize.STRING },
    display_name: { type: sequelize.Sequelize.STRING },
    email: { type: sequelize.Sequelize.STRING },
    family_name: { type: sequelize.Sequelize.STRING },
    fax_phone: { type: sequelize.Sequelize.STRING },
    given_name: { type: sequelize.Sequelize.STRING },
    homepage_url: { type: sequelize.Sequelize.STRING },
    hr_relationship: { type: sequelize.Sequelize.STRING },
    hr_relationship_class: { type: sequelize.Sequelize.STRING },
    hr_relationship_desc: { type: sequelize.Sequelize.STRING },
    image_url: { type: sequelize.Sequelize.STRING },
    is_alum: { type: sequelize.Sequelize.BOOLEAN },
    middle_name: { type: sequelize.Sequelize.STRING },
    name_suffix: { type: sequelize.Sequelize.STRING },
    phone_area_code: { type: sequelize.Sequelize.INTEGER },
    phone_area_code_secondary: { type: sequelize.Sequelize.INTEGER },
    phone_exchange: { type: sequelize.Sequelize.INTEGER },
    phone_extension: { type: sequelize.Sequelize.STRING },
    phone_extension_secondary: { type: sequelize.Sequelize.STRING },
    scid: { type: sequelize.Sequelize.STRING },
    scs_id: { type: sequelize.Sequelize.STRING },
    scs_email: { type: sequelize.Sequelize.STRING },
    scs_relationship_class: { type: sequelize.Sequelize.STRING },
    scs_relationship_subclass: { type: sequelize.Sequelize.STRING },
    scs_relationship_desc: { type: sequelize.Sequelize.STRING }
  };

export default DirectorySchema;
