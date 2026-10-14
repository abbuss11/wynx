# Connexion Supabase

Le projet Supabase est connecté au site via `@supabase/supabase-js`. Les migrations de ce dossier ont été appliquées au projet `uqsbzzewrimnrlnzkovz`; les tables de contenu sont protégées par RLS. Aucun devis ni client fictif n'a été importé.

## Activer le premier compte administrateur

1. Dans le tableau de bord Supabase, ouvrez **Authentication → Users** et créez/confirmez l'utilisateur qui administrera le site.
2. Copiez son UUID puis exécutez cette requête dans le SQL Editor, en remplaçant les valeurs :

   ```sql
   insert into public.admin_users (user_id, display_name)
   values ('UUID_DE_AUTH_USERS', 'Nom de l’administrateur');
   ```

3. Désactivez les inscriptions publiques dans les paramètres Auth si le site n'a pas besoin d'inscriptions utilisateurs.
4. Connectez-vous sur `/sudo` avec l'adresse e-mail et le mot de passe de cet utilisateur.

Seuls les UUID présents dans `admin_users` peuvent consulter les devis et clients, ou modifier les projets, articles et paramètres. Le formulaire public peut uniquement ajouter un devis. Les visiteurs ne peuvent lire que les projets `live` et les articles `published`.

## Configuration locale et déploiement

Les variables locales sont dans `.env.local`, un fichier ignoré par Git. En production, configurez `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` dans les variables d'environnement de l'hébergeur. La clé publishable est destinée au navigateur et reste limitée par les politiques RLS. N'ajoutez jamais de clé `service_role` ou `sb_secret_...` à l'application front-end.

Les exemples précédemment affichés dans le CRM et le graphique mensuel n'ont pas été copiés. Le graphique des devis affiche désormais les 12 mois glissants à partir des devis réellement enregistrés. Les données Analytics de trafic et visiteurs restent des valeurs de démonstration et ne sont pas connectées à Supabase dans cette étape.
