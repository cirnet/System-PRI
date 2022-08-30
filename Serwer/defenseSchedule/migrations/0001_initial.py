# Generated by Django 4.0.6 on 2022-08-29 19:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Commission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_start', models.TimeField()),
                ('time_end', models.TimeField()),
                ('is_complete', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('role', models.IntegerField(choices=[(0, 'Koordynator'), (1, 'Opiekun'), (2, 'Student')])),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ProjectGradeCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='defenseSchedule.project')),
                ('supervisor', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='defenseSchedule.person')),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='grade_card',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='defenseSchedule.projectgradecard'),
        ),
        migrations.CreateModel(
            name='Defense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('defense_date', models.DateField()),
                ('time_start', models.TimeField()),
                ('defense_type', models.IntegerField(choices=[(0, 'Defense Half'), (1, 'Defense Full')])),
                ('grade', models.IntegerField()),
                ('commission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='defenseSchedule.commission')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='defenseSchedule.team')),
            ],
        ),
        migrations.CreateModel(
            name='CommissionParticipation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('commission', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='defenseSchedule.commission')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='commission_participations', to='defenseSchedule.person')),
            ],
        ),
        migrations.CreateModel(
            name='AvailableTimeSlot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_start', models.TimeField()),
                ('time_end', models.TimeField()),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='defenseSchedule.person')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('login', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email address')),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='defenseSchedule.person')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
